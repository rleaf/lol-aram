import os
""" 
Convert non-webp images in `route` path to webp images to `out` path
"""

route = './src/assets/champion_splash'
out = './src/assets/champion_splash2'

def main():
   for file in os.listdir(route):
      champName = file.split('.')
      os.system(f'cwebp -q 70 {route}/{file} -o {out}/{champName[0]}.webp')

main()

   