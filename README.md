# PGHRT

This is the source code, just in case you wanted to build it yourself for some reason. Or difference tracking line edits. I should've had this originally, but I didn't, sooooo don't worry about it too much. The edits are for posterity more than they are "crucial info that everyone should look at" generally speaking, especially because it's intended to be a resource that is iterated upon and reviewed over time.

If you are interested in doing a translation or some sort of alternate version, please get in touch!

## Setting Up
This project uses `LaTeXML`. Install it [here](https://math.nist.gov/~BMiller/LaTeXML/get.html)

You might also need to install `texlive-latex-extra` with your package manager of choice.

```bash
cd pghrt
python3 -m venv .venv
.venv/bin/pip install beautifulsoup4
```

## Build Instructions

```bash
latexmlc --destination=export/index.html pghrt
.venv/bin/python soup.py
```