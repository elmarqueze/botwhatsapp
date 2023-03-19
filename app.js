const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


/*================== Respuesta de Botones =================*/
const rsptButtons = addKeyword(['Filtro de 5 litros🏔','Filtro de 10 litros🏔'])
    .addAnswer('¡Perfecto!🤩 En breves una asesora de ventas te ayudará a terminar tu compra🛒')
    

/*================== Flujo de Compra =================*/
const flujoCompra = addKeyword('Compra mi filtro HydroMountain🛒')
    .addAnswer('¿Qué productos te gustaría comprar?💧', {
        buttons: [
            {
                body: 'Filtro de 5 litros🏔'
            },
            {
                body:'Filtro de 10 litros🏔'
            }
        ]},
        null,
        rsptButtons
    )


/*================== Flujo Compra Repuestos =================*/
const flujoRepuestos = addKeyword('Comprar repuestos🔩')
    .addAnswer('¡Genial!🙌 En breves una asesora de ventas te ayudará con la compra.')

/*================== Flujo Asesoria/Información =================*/
const flujoAseInfo = addKeyword('Asesoría/Información📝')
        .addAnswer('¡Te estamos transfiriendo con una *Asesora de ventas*!✨')
        .addAnswer('Para que te ayude a despejar dudas y puedas pedir la info que necesites🙌')

/*================== Flujo Saludos/Despedida =================*/
const flujoSaludos = addKeyword(['saludos, gracias, hasta luego, grac, adios, bye'])
        .addAnswer('¡Muchas gracias por contactarnos!')
        .addAnswer('Esperamos saber pronto de ti ✨🙌🏔')

/*================== Flujo Principal =================*/
const flowPrincipal = addKeyword(['hola', 'ola', 'ole', 'alo', 'buenas', 'hi', 'hello', 'info'])
    .addAnswer('¡Bienvenido al chat de *HydroMountain*!👋😀')
    .addAnswer('¿En qué podemos ayudarte?', {
        buttons: [
            {
                body: 'Compra mi filtro HydroMountain🛒'
            },
            {
                body: 'Comprar repuestos🔩'
            },
            {
                body:'Asesoría/Información📝'
            }
        ]
        },
        null,
        [flujoCompra, flujoRepuestos, flujoAseInfo]
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
