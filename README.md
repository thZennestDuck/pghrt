# PGHRT

This is the source code, just in case you wanted to build it yourself for some reason. Or difference tracking line edits. I should've had this originally, but I didn't, sooooo don't worry about it too much. The edits are for posterity more than they are "crucial info that everyone should look at" generally speaking, especially because it's intended to be a resource that is iterated upon and reviewed over time.

If you are interested in doing a translation or some sort of alternate version, please get in touch!

## Setting Up
This project is reliant on `LaTeXML` and owes deep gratitute for its existence. Install it [here](https://math.nist.gov/~BMiller/LaTeXML/get.html), and please support it if you can!

You might also need to install `texlive-latex-extra` with your package manager of choice, or specific missing packages through `MiKTeX` if you prefer a lighter weight LaTeX installation. This project was created using Visual Studio Code so `.vscode` is included for your convenience for the build tasks.

### Linux

```bash
cd pghrt
python3 -m venv .venv
.venv/bin/pip install beautifulsoup4
```

### Windows

```bash
cd pghrt
python -m venv .venv
.venv/scripts/pip install beautifulsoup4
```

## Build Instructions

Currently, `/export` contains the build output for the HTML files where `/pdfs` contains the PDFs. To compile and build the source yourself, run either the `build_en.ps1` file (for just English) or the `build_all.ps1` file (for all supported languages) should be ran.

Please note that the `\DTMNow` error in the output of `latexmlc` should be ignored as it is handled by `soup.py`. There will also be a compile error unless the Python 3 package BeautifulSoup version 4.14+ is installed. `soup.py` manages the HTML post-processing and localization using the constitute components in `/trans`.

### Linux

```bash
latexmlc --destination=export/index.html pghrt
.venv/bin/python soup.py
```

### Windows

```bash
latexmlc --destination=export/index.html pghrt
.venv/scripts/python soup.py
```

## License

I don't know. Please attribute credit when it is safe and reasonable to do so. Please feel free to use any of this as a template (if you'd like to rip the guts of the .tex out) if it aids you in writing your own document about transition. We need more quality resources out there.
