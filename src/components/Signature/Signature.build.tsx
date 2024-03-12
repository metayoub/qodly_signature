import { FC, useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';
import cn from 'classnames';
import { useEnhancedNode } from '@ws-ui/webform-editor';
import { ISignatureProps } from './Signature.config';
import { MdClose } from 'react-icons/md';

const Signature: FC<ISignatureProps> = ({
  penColor,
  backgroundColor,
  clear,
  sizeButton,
  style,
  positionButton,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const isMountedRef = useRef<boolean>(true); // Ref to track mount state

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    isMountedRef.current = true; // Set to true when component mounts

    if (canvasRef.current) {
      // Initialize the signature pad
      const canvas = canvasRef.current;
      const signaturePad = new SignaturePad(canvas, {
        backgroundColor,
        penColor,
      });
      // signaturePad.penColor = penColor;
      signaturePad.off();
      signaturePadRef.current = signaturePad;

      // Cleanup function to destroy the signature pad when the component unmounts
      return () => {
        isMountedRef.current = false; // Set to false when component unmounts

        if (signaturePadRef.current && isMountedRef.current) {
          // Check if the component is still mounted before updating state
          signaturePadRef.current.off(); // Remove event listeners
          signaturePadRef.current.clear(); // Clear the signature pad
        }
      };
    }
  }, [backgroundColor, style]);

  return (
    <div ref={connect} style={style} className={cn('relative', className, classNames)}>
      <canvas ref={canvasRef} width={style?.width} height={style?.height} />
      {clear && (
        <MdClose
          size={sizeButton}
          className={`hover:cursor-pointer absolute top-1 ${positionButton === 'left' ? 'left-1' : 'right-1'} rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-300`}
          onClick={() => signaturePadRef.current?.clear()}
        />
      )}
    </div>
  );
};

export default Signature;
