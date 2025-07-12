from PIL import Image, ImageDraw, ImageFont
import os

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Project configurations
projects = [
    {
        'name': 'ai-resume-maker',
        'title': 'AI Resume Maker',
        'subtitle': 'React + AI',
        'color': '#667eea',
        'icon': '🤖'
    },
    {
        'name': 'battleship-game',
        'title': 'Battleship Game',
        'subtitle': 'C++ Algorithm',
        'color': '#764ba2',
        'icon': '🎯'
    },
    {
        'name': 'smart-home-automation',
        'title': 'Smart Home Automation',
        'subtitle': 'Python + Voice',
        'color': '#f093fb',
        'icon': '🏠'
    },
    {
        'name': 'movie-ticket-booking',
        'title': 'Movie Ticket Booking',
        'subtitle': 'Full Stack',
        'color': '#4facfe',
        'icon': '🎬'
    }
]

def hex_to_rgb(hex_color):
    """Convert hex color to RGB"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient_image(width, height, color1, color2):
    """Create a gradient image"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Create gradient effect
    for y in range(height):
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def generate_project_image(project):
    """Generate an image for a project"""
    width, height = 400, 200
    
    # Create gradient background
    color1 = hex_to_rgb(project['color'])
    color2 = (255, 255, 255)  # White
    img = create_gradient_image(width, height, color1, color2)
    
    # Add overlay for better text readability
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 76))  # 30% black overlay
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to basic if not available
    try:
        title_font = ImageFont.truetype("arial.ttf", 28)
        subtitle_font = ImageFont.truetype("arial.ttf", 18)
        icon_font = ImageFont.truetype("arial.ttf", 48)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        icon_font = ImageFont.load_default()
    
    # Add title
    draw.text((width//2, 80), project['title'], fill='white', font=title_font, anchor='mm')
    
    # Add subtitle
    draw.text((width//2, 120), project['subtitle'], fill='white', font=subtitle_font, anchor='mm')
    
    # Add icon
    draw.text((width//2, 160), project['icon'], fill='white', font=icon_font, anchor='mm')
    
    # Save the image
    filename = f"images/{project['name']}.jpg"
    img.save(filename, 'JPEG', quality=90)
    print(f"Generated: {filename}")

def main():
    print("Generating project images...")
    for project in projects:
        generate_project_image(project)
    print("All images generated successfully!")

if __name__ == "__main__":
    main() 