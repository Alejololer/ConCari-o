import sys
import types
import torchvision.transforms.functional as F

# Fix compatibility issue: mock the deprecated torchvision.transforms.functional_tensor module
# which basicsr tries to import.
try:
    import torchvision.transforms.functional_tensor
except ImportError:
    dummy_module = types.ModuleType("torchvision.transforms.functional_tensor")
    dummy_module.rgb_to_grayscale = F.rgb_to_grayscale
    sys.modules["torchvision.transforms.functional_tensor"] = dummy_module

import os
import glob
import cv2
import re
import torch
import numpy as np
from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet

def main():
    workspace = r"C:\Users\acarl\Documents\ConCariño"
    input_dir = os.path.join(workspace, "extracted-images")
    output_dir = os.path.join(workspace, "upscaled-images")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # Detect GPU availability
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    use_half = torch.cuda.is_available()
    print(f"Using device: {device} (half-precision/fp16: {use_half})")
    
    print(f"Loading RealESRGAN model...")
    # Use standard RRDBNet model for RealESRGAN_x4plus
    model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
    
    # Configure upsampler
    upsampler = RealESRGANer(
        scale=4,
        model_path='https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth',
        model=model,
        tile=256,
        tile_pad=10,
        pre_pad=0,
        half=use_half,
        device=device
    )
    
    all_pngs = glob.glob(os.path.join(input_dir, "*.png"))
    # Match final mapped products only: e.g. amor-1.png, mama-20.png.
    # Exclude intermediate files with leading zeros (e.g. amor-001.png)
    pattern = re.compile(r'^[a-z]+-[1-9]\d*\.png$')
    image_paths = [p for p in all_pngs if pattern.match(os.path.basename(p))]
    
    print(f"Found {len(image_paths)} final product images to upscale (filtered from {len(all_pngs)} files).")
    
    for idx, img_path in enumerate(image_paths):
        base_name = os.path.basename(img_path)
        out_path = os.path.join(output_dir, base_name)
        
        if os.path.exists(out_path):
            print(f"[{idx+1}/{len(image_paths)}] Skipping {base_name} (already upscaled).")
            continue
            
        print(f"[{idx+1}/{len(image_paths)}] Upscaling {base_name}...")
        try:
            # Use numpy to read file with non-ASCII characters in Windows
            img = cv2.imdecode(np.fromfile(img_path, dtype=np.uint8), cv2.IMREAD_COLOR)
            if img is None:
                print(f"Error decoding {img_path}")
                continue
                
            # Perform upscaling
            output, _ = upsampler.enhance(img, outscale=2) # Upscale by 2x
            
            # Use numpy to write file with non-ASCII characters in Windows
            is_success, im_buf_arr = cv2.imencode(".png", output)
            if is_success:
                im_buf_arr.tofile(out_path)
                print(f"Saved upscaled image to {out_path}")
            else:
                print(f"Error encoding output image for {base_name}")
        except Exception as e:
            print(f"Failed to upscale {base_name}: {e}")

if __name__ == "__main__":
    main()
