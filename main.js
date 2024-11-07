import { AccountFlags, CreateAccountError, createClient, id } from "tigerbeetle-node";

async function run() {
  const client = createClient({
    cluster_id: 0n,
    replica_addresses: [process.env.TB_ADDRESS || "3000"],
  });

  // Prepare accounts

  const accountDefaults = {
    debits_pending: BigInt(0),
    debits_posted: BigInt(0),
    credits_pending: BigInt(0),
    credits_posted: BigInt(0),
    user_data_128: BigInt(0),
    user_data_64: BigInt(0),
    user_data_32: 0,
    reserved: 0,
    ledger: 1,
    code: 718,
    flags: AccountFlags.history,
    timestamp: BigInt(0),
  }

  const account_a = {
    id: id(),
    ...accountDefaults,
  };

  const account_b = {
    id: id(),
    ...accountDefaults,
  }

  // Create accounts

  try {
    const account_errors = await client.createAccounts([account_a, account_b]);

    if (account_errors.length > 0) {
      for (const error of account_errors) {
        switch (error.result) {
          case CreateAccountError.exists:
            console.error(`Batch account at ${error.index} already exists.`);
            break;
          default:
            console.error(
              `Batch account at ${error.index} failed to create: ${CreateAccountError[error.result]}.`,
            );
        }
      }
    }

    console.log({
      a: account_a.id,
      b: account_b.id,
    });
  } catch (e) {
    throw Error(e);
  };

  // Create transfers

  try {
    const transfers = [{
      id: id(),
      debit_account_id: account_a.id,
      credit_account_id: account_b.id,
      amount: BigInt(10),
      pending_id: BigInt(0),
      user_data_128: BigInt(0),
      user_data_64: BigInt(0),
      user_data_32: 0,
      timeout: 0,
      ledger: 1,
      code: 720,
      flags: 0,
      timestamp: BigInt(0),
    }];

    const transfer_errors = await client.createTransfers(transfers);

    if (transfer_errors.length > 0) {
      for (const error of transfer_errors) {
        switch (error.result) {
          case CreateTransferError.exists:
            console.error(`Batch transfer at ${error.index} already exists.`);
            break;
          default:
            console.error(
              `Batch transfer at ${error.index} failed to create: ${
                CreateTransferError[error.result]
              }.`,
            );
        }
      }
    }
  } catch (e) {
    throw Error(e);
  };

  return;
};

await run();
