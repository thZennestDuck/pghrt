#!/usr/bin/env python3
#source: @jonesetc.com ty king
from bs4 import BeautifulSoup

# Parse the file into soup
with open('output_prebuild.html', 'r', encoding='utf-8') as fin:
    soup = BeautifulSoup(fin, 'html.parser')

# Create menu button, header, and nest
menu = soup.new_tag(
    'button',
    id='menu',
    onclick='document.getElementById(\'sidebar\').classList.toggle(\'show\')',
    string='☰',
)
header = soup.new_tag('div', **{'class':'header'})
header.append(menu)

# Extract nav
toc = soup.body.find('div', class_='ltx_page_main').nav.extract()

# Prepend header and toc into body
soup.body.insert(0, header, toc)

# Add header info

head_meta = soup.new_tag(
    'meta',
    property='og:title',
    content='A Practical Guide To Feminizing HRT',
)
soup.head.append(head_meta)
soup.head.append("\n")

head_meta = soup.new_tag(
    'meta',
    property='og:type',
    content='website',
)
soup.head.append(head_meta)
soup.head.append("\n")

head_meta = soup.new_tag(
    'meta',
    property='og:url',
    content='https://www.pghrt.diy',
)
soup.head.append(head_meta)
soup.head.append("\n")

head_meta = soup.new_tag(
    'meta',
    property='og:image',
    content='/img/cover.png',
)
soup.head.append(head_meta)
soup.head.append("\n")

head_meta = soup.new_tag(
    'meta',
    property='og:description',
    content='The futile attempt at answering every possible question for someone looking to trans their sex.',
)
soup.head.append(head_meta)
soup.head.append("\n")

head_meta = soup.new_tag(
    'link',
    rel='icon',
    type='image/png',
    href='/img/favicon.png'
)
soup.head.append(head_meta)
soup.head.append("\n")

head_meta = soup.new_tag(
    'link',
    rel='stylesheet',
    type='text/css',
    href='pghrtcss.css'
)
soup.head.append(head_meta)
soup.head.append("\n")

head_meta = soup.new_tag(
    'script',
    type='text/javascript',
    src='pghrtjs.js',
    defer='true'
)
soup.head.append(head_meta)
soup.head.append("\n")

print("soup")

# Write the updated soup back out to the file
with open('export/index.html', 'w', encoding='utf-8') as fout:
    fout.write(str(soup))