from PIL import Image
import os

def split_image(image_path, output_folder, piece_width=32, piece_height=32):
    # Open the image
    image = Image.open(image_path)
    image_width, image_height = image.size

    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Calculate the number of pieces in each dimension
    num_pieces_x = image_width // piece_width
    num_pieces_y = image_height // piece_height

    # Split the image into pieces
    for j in range(num_pieces_y):
        for i in range(num_pieces_x):
            left = i * piece_width
            upper = j * piece_height
            right = left + piece_width
            lower = upper + piece_height

            piece = image.crop((left, upper, right, lower))
            piece.save(os.path.join(output_folder, f"piece_{j}_{i}.png"))

if __name__ == "__main__":
    image_path = "terrain2.png"
    output_folder = "lpc_terrain2"
    split_image(image_path, output_folder)