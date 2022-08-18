# backend :

1/ À la racine du dossier backend créer un fichier ".env" puis écrivez :

DATABASE_URL="YourDatabaseUrl"

YourDatabaseUrl est le lien de votre base de donnéé.

2/ À la racine du dossier backend créer un dossier "rsa" puis creer vous fichier clé depuis le terminal en vous plaçant dans le dossier "rsa" à l'aide de cette commande :

ssh-keygen -t rsa -b 4096 -m PEM -f key

puis convertissez le en notre format avec cette commande :

ssh-keygen -e -m PEM -f key > key.pub
