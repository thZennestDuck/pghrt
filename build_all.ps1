# make pdf, clean mess, make html, transform html
# please note that /nul is windows specific; /dev/null for linux to disregard log files
# repeats for each language

# TODO: add auto-change for windows/linux?

# activate venv for current build
# note that this script path is again windows; see readme for linux path
set-executionpolicy -ExecutionPolicy RemoteSigned -Scope Process
.\.venv\Scripts\Activate.ps1

# currently supported non-english languages; source of truth
# german (de), 
$languages = @("de")
$output = $languages -join " "

Write-Host "Currently supported localizations: $output"
$lc = Read-Host "Please input the desired language code, or press enter to build all"

if ($languages -contains $lc) {
    latexmk -pdf -outdir=pdfs -silent trans/$lc/$lc;
    latexmk -c -outdir=pdfs -silent trans/$lc/$lc;
    latexmlc --destination=export/$lc.html --log=/nul trans/$lc/$lc;
    python soup.py $lc;
}
else {
    # english (en)
    # english exceptionalism, sorry
    latexmk -pdf -outdir=pdfs -silent pghrt;
    latexmk -c -outdir=pdfs -silent pghrt;
    latexmlc --destination=export/index.html --log=/nul pghrt;
    python soup.py en;

    # all other languages
    foreach ($lc in $languages) {
        latexmk -pdf -outdir=pdfs -silent trans/$lc/$lc;
        latexmk -c -outdir=pdfs -silent trans/$lc/$lc;
        latexmlc --destination=export/$lc.html --log=/nul trans/$lc/$lc;
        python soup.py $lc;
    }
}