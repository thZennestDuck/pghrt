#source: @jonesetc.com ty king you're an icon
from bs4 import BeautifulSoup
import os
import csv
import sys


# TO DO
# 1. soup the toc title text to be accurate
# 2. maybe figure out the href title text for extrenal hrefs?
# 3. add alt text to images???

#
# begin parsing file
#

# list of currently supported languages
lang_codes = ["en", "de"]

# check if a code is used
if len(sys.argv) < 2: 
    print("MISSING LANGUAGE CODE. Usage: python soup.py <language code>") 
    sys.exit(1) 

# check if too many codes are used for some reason
if len(sys.argv) > 2: 
    print("TOO MANY LANGUAGE CODES. Usage: python soup.py <language code>") 
    sys.exit(1) 

# check if it's a currently supported language. idk how you'd miss this up but it's a typo check basically
language = sys.argv[1]
if language not in lang_codes:
    print("INCORRECT LANGUAGE CODE. Currently supported: ", lang_codes)
    sys.exit(1)

# debugging check
print("Language used: ",language)

# build spice cabinet to make soup for each language
# file path relative to main example: trans/en/spices_en.csv
language_path = os.path.join("trans",language)
spice_file = "spices_" + language + ".csv"
cabinet_file = os.path.join(language_path,spice_file)

# choose file for language
# en carve out to be default index.html
# en carve out for pdf file name as well
html_loc_name = language + ".html"
if language == "en":
    html_file = os.path.join("export","index.html")
    og_url_tag = "https://pghrt.diy"
else:
    html_file = os.path.join("export",html_loc_name)
    og_url_tag = "https://" + language + ".pghrt.diy"

#
# begin making soup
#

# seasonings for soup. it's a chinese 5 spice blend [read: html loc. also there are five entries in the localization file]
with open(cabinet_file) as csvfile:
    cabinet = list(csv.reader(csvfile))[0]

# Parse the file into soup
with open(html_file, 'r', encoding='utf-8') as fin:
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

# Create toggle buttons, header, and nest
toggles = soup.new_tag('div', **{'class':'togglebuttons'})
menu = soup.new_tag(
    'button',
    id='theme-toggle',
    string='☀',
)
toggles.append(menu)
menu = soup.new_tag(
    'button',
    id='font-toggle',
    string='Aa',
)
toggles.append(menu)

# Extract nav
toc = soup.body.find('div', class_='ltx_page_main').nav.extract()

# need id to grab to make the menu button work
toc['id'] = 'sidebar'

# correcting a bug in latexml that drops em dash prefixes on toc in html output
toc_emdashes = toc.select('a[href*="SSx"] > span')
for line in toc_emdashes:
    line.string.insert_before('—')

# adding a toast
# localization position 0: "Link Copied!"
toast = soup.new_tag (
    "div",
    id="snackbar",
    string=cabinet[0]
)

# add return to ref button
# localization position 1: "Return to previous position"
ref = soup.new_tag (
    "div",
    id="return",
    title=cabinet[1]
)

# prepend bottom with all the silly stuff i add
soup.body.insert(0, toast, ref, toggles, header, toc)

# Add header info tags
# i don't know if there's a better way to do all of these in a batch but like eh w/e
# localization position 2: "A Practical Guide To Feminizing HRT"
# localization position 3: "The futile attempt yadda yadda"

head_meta = soup.new_tag(
    'meta',
    property='og:title',
    content=cabinet[2],
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
    content=og_url_tag,
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
    content=cabinet[3],
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

# find all the section and question headers then add a click to copy icon
# localization position 4: "Click to copy"
for element in soup.find_all(["h2", "h3"]):
    #find the id of its section
    hash = element.parent['id']

    new_chain = soup.new_tag(
        'a',
        **{'class':'ltx_ref chain'},
        href="#" + hash,
        title=cabinet[4],
        onclick="copyURI(event)",
        string=' 🔗',
    )

    element.append(new_chain)

# changing pdf link for non-english language
# hosted on github because that keeps the site lighter under cloudflare's limit
if language != "en":
    soup.find(href="https://raw.githubusercontent.com/Juicysteak117/pghrt/refs/heads/main/pdfs/pghrt.pdf")['href'] = "https://raw.githubusercontent.com/Juicysteak117/pghrt/refs/heads/main/pdfs/" + language + ".pdf"

# appending "img/" to source of images for the html
# can't get latexml to play nice with graphicspath so this is easier
for element in soup.select('figure > img'):
    old_string = element['src']
    element['src'] = 'img/' + old_string

# replacing \DTMNow with the footer timestamp because there aren't latexml
# bindings for the datetime2 package and i want it to look prettier
# i also remove the double space because it REALLY annoys me. i already sent
# in an issue about it though. eventually i can remove that line lol
# i realize this doesn't localize but truly do i care???? no. come on now.
dtm = soup.body.find('span', class_='ltx_ERROR undefined')
dtm['class'] = 'undefined'
timestamp = soup.footer.div.contents[0]
postmarked = timestamp.text.replace("Generated  on ", "Generated on ")
timestamp.replace_with(postmarked)
dtm.string = postmarked.replace("Generated on ", "").replace(" by ", "")

# i'm at soup
print("soup made for language: ",language)

# Write the updated soup back out to the file
with open(html_file, 'w', encoding='utf-8') as fout:
    fout.write(str(soup))