/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   version: 1.0.0
 *   title: API Documentation
 * paths:
 *   /api/entities:
 *     post:
 *       summary: Créer une entité
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Entity'
 *       responses:
 *         '200':
 *           description: Entité créée avec succès
 *     get:
 *       summary: Récupérer toutes les entités
 *       responses:
 *         '200':
 *           description: OK
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Entity'
 *   /api/entities/{id}:
 *     get:
 *       summary: Récupérer une entité par ID
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: OK
 *           schema:
 *             $ref: '#/definitions/Entity'
 *     put:
 *       summary: Mettre à jour une entité
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Entity'
 *       responses:
 *         '200':
 *           description: Entité mise à jour avec succès
 *     delete:
 *       summary: Supprimer une entité
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Entité supprimée avec succès
 * definitions:
 *   Entity:
 *     type: object
 *     properties:
 *       country:
 *         type: string
 *       departement:
 *         type: string
 *       name:
 *         type: string
 *       adress:
 *         type: string
 *       tel:
 *         type: string
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       realAdress:
 *         type: string
 *       email:
 *         type: string
 */