# make pdf, clean mess, make html, transform html
# please note that /nul is windows specific; /dev/null for linux to disregard log files

# activate venv for current build
set-executionpolicy -ExecutionPolicy RemoteSigned -Scope Process
.\.venv\Scripts\Activate.ps1

# english (en)
# english exceptionalism, sorry
latexmk -pdf -outdir=pdfs -silent pghrt;
latexmk -c -outdir=pdfs -silent pghrt;
latexmlc --destination=export/index.html --log=/nul pghrt;
python soup.py en;