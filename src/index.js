import app from './app.js'
import {connectDB} from './db.js'

/*se conecta a la base de datos*/
connectDB();

/*se crea el puerto del servidor*/
app.listen(3000)
console.log('Server on port', 3000)