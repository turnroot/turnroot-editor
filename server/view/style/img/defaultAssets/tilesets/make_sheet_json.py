import os
import json

def list_files_in_directory(directory_path):
    files = []
    for filename in os.listdir(directory_path):
        if os.path.isfile(os.path.join(directory_path, filename)):
            files.append({"name": filename, "type":"ground"})
    return files

def save_to_json(data, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

if __name__ == "__main__":
    directory_path = "lpc_sand"
    output_file = "lpc_sand/tiles.json"

    files = list_files_in_directory(directory_path)
    save_to_json(files, output_file)

    print(f"File names have been saved to {output_file}")