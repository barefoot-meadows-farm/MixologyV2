import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onBarcodeDetected: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ isOpen, onClose, onBarcodeDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Setup camera when dialog opens
  useEffect(() => {
    if (isOpen) {
      setupCamera();
    } else if (stream) {
      // Clean up when dialog closes
      stopCamera();
    }
    
    return () => {
      if (stream) {
        stopCamera();
      }
    };
  }, [isOpen]);
  
  const setupCamera = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Check if BarcodeDetector is supported
      const isBarcodeDetectorSupported = 'BarcodeDetector' in window;
      
      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsLoading(false);
          
          // Start scanning for barcodes
          if (isBarcodeDetectorSupported) {
            startNativeBarcodeDetection();
          } else {
            // Load and initialize QuaggaJS for barcode detection
            import('quagga').then((Quagga) => {
              startQuaggaScanning(Quagga.default);
            }).catch(err => {
              setError('Failed to load barcode scanning library');
              console.error('Error loading Quagga:', err);
            });
          }
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setHasCamera(false);
      setError('Unable to access camera. Please make sure you have granted camera permissions.');
      setIsLoading(false);
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };
  
  const startNativeBarcodeDetection = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    try {
      // @ts-ignore - TypeScript doesn't know about BarcodeDetector yet
      const barcodeDetector = new BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'code_93', 'data_matrix', 'qr_code']
      });
      
      const detectFrame = async () => {
        if (!videoRef.current || !canvasRef.current) return;
        
        try {
          // @ts-ignore
          const barcodes = await barcodeDetector.detect(videoRef.current);
          
          if (barcodes.length > 0) {
            // Barcode detected
            const barcode = barcodes[0].rawValue;
            handleBarcodeDetected(barcode);
            return; // Stop scanning after detection
          }
          
          // Continue scanning if no barcode detected
          requestAnimationFrame(detectFrame);
        } catch (err) {
          console.error('Barcode detection error:', err);
          requestAnimationFrame(detectFrame);
        }
      };
      
      detectFrame();
    } catch (err) {
      console.error('BarcodeDetector initialization error:', err);
      // Fall back to QuaggaJS if native detector fails
      import('quagga').then((Quagga) => {
        startQuaggaScanning(Quagga.default);
      }).catch(err => {
        setError('Failed to initialize barcode scanning');
        console.error('Error loading Quagga:', err);
      });
    }
  };
  
  const startQuaggaScanning = (Quagga: any) => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const videoElement = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    // Setup Quagga with live video stream
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoElement,
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          facingMode: "environment"
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: navigator.hardwareConcurrency || 4,
      decoder: {
        readers: [
          "ean_reader",
          "ean_8_reader",
          "upc_reader",
          "upc_e_reader",
          "code_128_reader",
          "code_39_reader",
          "code_93_reader",
          "codabar_reader"
        ]
      },
      locate: true
    }, function(err: any) {
      if (err) {
        console.error('Quagga initialization error:', err);
        setError('Failed to initialize barcode scanning');
        return;
      }
      
      // Start Quagga scanning
      Quagga.start();
      
      // Add result listener
      Quagga.onDetected((result: any) => {
        if (result && result.codeResult && result.codeResult.code) {
          const barcode = result.codeResult.code;
          handleBarcodeDetected(barcode);
          Quagga.stop();
        }
      });
    });
  };
  
  const handleBarcodeDetected = (barcode: string) => {
    // Debounce to prevent multiple rapid detections
    stopCamera();
    onBarcodeDetected(barcode);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Barcode</DialogTitle>
        </DialogHeader>
        
        <div className="relative overflow-hidden rounded-md bg-background">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Loader2 className="h-8 w-8 animate-spin text-mixology-burgundy" />
              <span className="ml-2 text-sm text-muted-foreground">Accessing camera...</span>
            </div>
          )}
          
          {error && (
            <div className="p-4 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={setupCamera}>Try Again</Button>
            </div>
          )}
          
          <div className={cn("relative aspect-video", (isLoading || error) && "opacity-50")}>
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover" 
              playsInline 
              muted
            />
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full opacity-0" 
            />
            
            {/* Scanning guide overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-full w-full flex items-center justify-center">
                <div className="border-2 border-mixology-burgundy w-2/3 h-1/3 rounded-lg opacity-70">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-mixology-burgundy rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-mixology-burgundy rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-mixology-burgundy rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-mixology-burgundy rounded-br-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button 
            variant="default" 
            className="bg-mixology-burgundy hover:bg-mixology-burgundy/90"
            onClick={setupCamera}
            disabled={isLoading}
          >
            <Camera className="mr-2 h-4 w-4" />
            Rescan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanner;