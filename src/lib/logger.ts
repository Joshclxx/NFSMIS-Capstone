// import winston from "winston"

// const isProduction = process.env.NODE_ENV === "production"

// const logOptions = isProduction ?
// {
//     level: "info",
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//     ),
//     transports: [
//         new winston.transports.Console()
//     ]
// } :

// {
//     level: "debug",
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//     ),
//     transports: [
//         new winston.transports.Console()
//     ]
// }

// export const logger = winston.createLogger(logOptions)