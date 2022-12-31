DATENUM=$(date +%Y%m%d)

echo "slug:"
read slug

echo "title:"
read title

echo "description:"
read description

FILE="src/articles/blog/${slug}.md"

if [ -e $FILE ]; then
  touch $FILE
fi

echo -e "---\nslug: \"${slug}\"\ntitle: \"${title}\"\ndate: \"${DATENUM}\"\ndescription: \"${description}\"\ntags: []\n---\n" > $FILE
