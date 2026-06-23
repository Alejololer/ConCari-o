import os
import glob
import subprocess

workspace = r"C:\Users\acarl\Documents\ConCariño"
high_res_dir = os.path.join(workspace, "extracted-images", "high-res")

def run_cmd(cmd):
    try:
        # Run command and capture output
        res = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
        return True, res.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr + "\n" + e.stdout

def main():
    print("Finding files in high-res directory...")
    files = glob.glob(os.path.join(high_res_dir, "*.png"))
    print(f"Found {len(files)} files to upload.")
    
    success_count = 0
    fail_count = 0
    
    for idx, filepath in enumerate(files):
        filename = os.path.basename(filepath)
        print(f"[{idx+1}/{len(files)}] Uploading {filename}...")
        
        # 1. Remove old file
        rm_cmd = f'supabase storage rm --linked "ss:///product-images/products/{filename}"'
        print(f"  Running: {rm_cmd}")
        rm_ok, rm_out = run_cmd(rm_cmd)
        if not rm_ok:
            print(f"  Note (rm): {rm_out.strip()}")
            
        # 2. Upload new file
        cp_cmd = f'supabase storage cp --linked --experimental "{filepath}" "ss:///product-images/products/{filename}"'
        print(f"  Running: {cp_cmd}")
        cp_ok, cp_out = run_cmd(cp_cmd)
        if cp_ok:
            print(f"  Successfully uploaded!")
            success_count += 1
        else:
            print(f"  FAILED upload: {cp_out.strip()}")
            fail_count += 1
            
    print(f"\nUpload complete!")
    print(f"Successfully uploaded: {success_count}")
    print(f"Failed: {fail_count}")

if __name__ == "__main__":
    main()
