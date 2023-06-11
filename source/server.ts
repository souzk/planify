import { app } from '@me/app'
import { env } from '@me/environment'

app.listen(
    {
        host: env.HOST,
        port: env.PORT
    },
    (error) => {
        if (error) throw error

        console.log('Time traveling 🪼')
    }
)
