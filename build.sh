# cd /mnt/c/Users/arama/Documents/My\ Web\ Sites/WordPress/wp-content/plugins/CFF
# ./build.sh 1.0.9
# zip -r "$1.zip" . -x *.zip* *node_modules* *.git*
git archive --format=zip HEAD -o $0.zip