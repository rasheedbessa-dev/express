const express=require('express');
const path=require('path');

const app=express();
const port=3004;

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

const verifierHoraire = function(req, res, next) {
    const maintenant = new Date();  // ← ICI, au début
    const jour = maintenant.getDay();
    const heure = maintenant.getHours();

    const estJourOuvrable = (jour >= 1 && jour <= 5);
    const estHeureTravail = (heure >= 9 && heure < 17);

    if (estJourOuvrable && estHeureTravail) {
        next();
    } else {
        res.render('ferme', {
            heureActuelle: maintenant.toLocaleTimeString('fr-FR'),
            jourActuel: maintenant.toLocaleDateString('fr-FR', { weekday: 'long' })
        });
    }
};
app.use(verifierHoraire);

app.get('/',function(req,res){
    res.render('acceuil',{
        titre:'Acceuil',
        active:'acceuil',
        messageBienvenue:'Bonjour et bienvenue chez nous.',
        nombreVisites:42
    });
});
app.get('/services',function(req,res){
    res.render('services',{
        tire:'nos services',
        active:'services',
        services:[
            {nom:'Création de sites Web',prix:'50000 da',icone:'💻'},
            {nom:'Design graphique',prix:'40000 da',icone:'🎨'},
        ]
    });
});

app.get('/contact',function(req,res){
    res.render('contact',{
        titre:'Nous Contacter',
        active:'contact',
        estOuvert:true,
        email:'bouzida@gmail.com'
    });
});

app.listen(port,function(){
    console.log('Serveur démaréé sur http://localhost:' +port);
});