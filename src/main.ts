import * as core from '@actions/core'
import {
  Inputs,
  Output,
  getBlobServiceClient,
  getInputs,
  uploadBlobs
} from './upload'

async function run(): Promise<void> {
  try {
    // Retrieve user inputs to action
    const inputs: Inputs = getInputs()
    // Retrieve authenticated container client
    const containerClient = getBlobServiceClient(
      inputs.account
    ).getContainerClient(inputs.destination)
    // Upload files to container
    const output: Output[] = await uploadBlobs(containerClient, inputs.source)

    core.setOutput('urls', JSON.stringify(output))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
