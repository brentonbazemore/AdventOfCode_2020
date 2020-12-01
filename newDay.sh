FOLDER_NAME=$1

if [ -d $FOLDER_NAME ] 
then
  echo "$FOLDER_NAME already exists."
  exit 1
fi

mkdir $FOLDER_NAME

cp -R ./NodeTypescriptStarterTemplate ./$FOLDER_NAME/pt1

git add .
git commit -m "Init $FOLDER_NAME - pt1"