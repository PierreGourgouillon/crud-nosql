const { Datastore } = require('@google-cloud/datastore');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require("uuid")
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');

// Instanciation du client Datastore
const datastore = new Datastore({ keyFilename: "credentials.json" })

// Configuration de l'application Express
const app = express();
app.use(bodyParser.json());

// Création d'une entité
app.post('/api/entities', async (req, res) => {
  try {
    const entityData = req.body;
    const key = datastore.key('school');

    const entity = {
      key: key,
      data: entityData
    };

    await datastore.save(entity);

    res.status(200).json({ message: 'Entité créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'entité:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'entité' });
  }
});

app.get('/api/entities', async (req, res) => {
    try {
      const query = datastore.createQuery("school");
      const [items] = await datastore.runQuery(query);
  
      res.json(items);
    } catch (error) {
      console.error('Erreur lors de la récupération des éléments :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des éléments' });
    }
  });

// Récupération d'une entité par ID
app.get('/api/entities/:id', async (req, res) => {
  try {
    const query = datastore.createQuery("school");
    const [items] = await datastore.runQuery(query);

    const it = items.find(element => element.id == req.params.id)

    res.status(200).json(it)
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entité:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'entité' });
  }
});

// Mise à jour d'une entité
app.put('/api/entities/:id', async (req, res) => {
  try {
    const entityId = parseInt(req.params.id, 10);
    const entityData = req.body;

    const key = datastore.key(['school', entityId]);
    const entity = await datastore.get(key);

    if (entity[0]) {
      entityData.id = entityId; // Assurez-vous que l'ID reste le même lors de la mise à jour
      const updatedEntity = {
        key: key,
        data: entityData
      };

      await datastore.update(updatedEntity);
      res.status(200).json({ message: 'Entité mise à jour avec succès' });
    } else {
      res.status(404).json({ error: 'Entité non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'entité:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entité' });
  }
});

// Suppression d'une entité
app.delete('/api/entities/:id', async (req, res) => {
  try {
    const entityId = parseInt(req.params.id, 10);

    const key = datastore.key(['school', entityId]);
    const entity = await datastore.get(key);

    if (entity[0]) {
      await datastore.delete(key);
      res.status(200).json({ message: 'Entité supprimée avec succès' });
    } else {
      res.status(404).json({ error: 'Entité non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'entité:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'entité' });
  }
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Démarrage du serveur
app.listen(3000, () => {
    // importCSVData()
    console.log('Serveur démarré sur le port 3000');
});


function importCSVData() {
    fs.createReadStream("school.csv")
      .pipe(csv())
      .on('data', (row) => {
        const id = uuidv4()
        row.id = id
        // Convertir les données du CSV en entités Datastore
        const entity = {
          key: datastore.key('school'), // Remplacez par le nom de votre collection
          data: row,
        };
  
        // Insérer l'entité dans Datastore
        datastore.save(entity).catch((error) => {
          console.error('Erreur lors de l\'importation de l\'entité :', error);
        });
      })
      .on('end', () => {
        console.log('Importation terminée');
      });
}
