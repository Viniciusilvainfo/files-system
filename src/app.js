import express from 'express';
import fs from 'fs-extra';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get('/', async (req, res) => {

    fs.readFile('/tmp/teste.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        res.json({ "dados": data });
    });

});

app.get('/copiar', async (req, res) => {
    fs.copy('/tmp', '/new')
        .then(() => console.log('success!'))
        .catch(err => console.error(err))
});

app.delete('/', async (req, res) => {
    fs.remove('/tmp/teste.txt', err => {
        if (err) return console.error(err)
        console.log('sucesso!')
      })
});

app.use((req, res) => {
    res.status(404).send("NOT FOUND ROUTE");
})

app.listen(PORT, () => {
    console.log("ESCUTANDO NA PORTA 3000");
});