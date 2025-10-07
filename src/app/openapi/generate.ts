import minimist from 'minimist'
import fs from 'node:fs'
import https from 'node:https'
import process from 'node:process'
import { URL } from 'node:url'
import openapiTS, { astToString } from 'openapi-typescript'
import ts from 'typescript'
import YAML from 'yaml'

const argv = minimist(process.argv.slice(2))

const INPUT_FILE_PATH = 'https://cs.linfed.ru/api/openapi.json'
const OUTPUT_OPENAPI_NAME = 'api.json'
const OUTPUT_TYPES_NAME = 'api.d.ts'

async function generateTSDeclaration() {
    const FILE = ts.factory.createIdentifier('File')
    const STRING = ts.factory.createToken(ts.SyntaxKind.StringKeyword)

    const localPath = new URL(`./${OUTPUT_OPENAPI_NAME}`, import.meta.url)
    const schema = YAML.parse(fs.readFileSync(localPath, 'utf8'))

    const output = await openapiTS(schema, {
        transform(schemaObject, metadata) {
            if (schemaObject.format === 'binary') {
                if (metadata.path?.includes('form-data')) {
                    return ts.factory.createUnionTypeNode([FILE as unknown as ts.TypeNode, STRING])
                }
            }

            return undefined
        }
    })
    const typesPath = new URL(`./${OUTPUT_TYPES_NAME}`, import.meta.url)
    await fs.promises.writeFile(typesPath, astToString(output))

    // eslint-disable-next-line no-console
    console.log(`🚀 ${localPath.href} → ${typesPath.href}`)
}

async function downloadOpenapiConfig(onSuccess?: () => void) {
    const url = INPUT_FILE_PATH
    const filePath = `./src/app/openapi/${OUTPUT_OPENAPI_NAME}`

    https
        .get(url, response => {
            const fileStream = fs.createWriteStream(filePath)
            response.pipe(fileStream)

            fileStream.on('finish', () => {
                fileStream.close()

                // eslint-disable-next-line no-console
                console.log('📁 OpenApi file downloaded successfully!')
                onSuccess?.()
            })
        })
        .on('error', err => {
            console.error('Error downloading the file:', err)
        })
}

if (argv.mode === 'download') {
    downloadOpenapiConfig()
} else if (argv.mode === 'generate') {
    generateTSDeclaration()
} else {
    downloadOpenapiConfig(generateTSDeclaration)
}
