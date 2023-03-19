const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


/*================== Respuesta de Botones =================*/
const rsptButtons = addKeyword(['Postres🍮','Stevia en Pote🥄🌿','Stevia en Sachets📦🌿', 'Asesoría/Información📝'])
    .addAnswer('¡Perfecto!🤩 En breves una asesora de ventas te ayudará a terminar tu compra🛒')
    

/*================== Flujo de Compra =================*/
const flujoCompra = addKeyword('Comprar EndulVida🛒')
    .addAnswer('¿Qué productos te gustaría comprar?', {
        buttons: [
            {
                body: 'Postres🍮'
            },
            {
                body: 'Stevia en Pote🥄🌿'
            },
            {
                body:'Stevia en Sachets📦🌿'
            }
        ]},
        null,
        rsptButtons
    )


/*================== Flujo Catálogo =================*/
const flujoCatalogo = addKeyword('Catálogo de productos🛍')
    .addAnswer('¡Genial!🙌 Aquí te dejamos nuestro catálogo👉 https://wa.me/c/5193857967')
    .addAnswer('Si deseas comprar o pedir información:', {
        buttons: [
            {
                body: 'Comprar EndulVida 🛒'
            },
            {
                body:'Asesoría/Información 📝'
            }
        ]},
        null,
        [rsptButtons, flujoCompra]
    )

/*================== Flujo Info =================*/
const flujoAseInfo = addKeyword('Asesoría/Información📝')
        .addAnswer('¡Te estamos transfiriendo con una *Asesora de ventas*!✨')
        .addAnswer('Para que te ayude a despejar dudas y puedas pedir la info que necesites🙌')

/*================== Flujo Saludos/Despedida =================*/
const flujoSaludos = addKeyword(['saludos, gracias, hasta luego, grac, adios, bye'])
        .addAnswer('¡Muchas gracias por contactarnos!')
        .addAnswer('Esperamos saber pronto de ti ✨🙌')

/*================== Flujo Principal =================*/
const flowPrincipal = addKeyword(['hola', 'ola', 'ole', 'alo', 'buenas', 'hi', 'hello', 'info'])
    .addAnswer('¡Bienvenido al chat de *EndulVida*!👋😀')
    .addAnswer('¿En qué podemos ayudarte?', {
        buttons: [
            {
                body: 'Comprar EndulVida🛒'
            },
            {
                body: 'Catálogo de productos🛍'
            },
            {
                body:'Asesoría/Información📝'
            }
        ]
        },
        null,
        [flujoCompra, flujoCatalogo, flujoAseInfo]
    )



/*================== MAIN =================*/
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flujoSaludos])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
