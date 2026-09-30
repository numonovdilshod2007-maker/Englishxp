# EnglishXP Shop Fix

Shop purchase flow was hardened and made immediately testable.

## Changes
- Shop purchases now use Firestore transactions to prevent stale gem balance overwrites.
- Added one-time 250-gem starter bonus for accounts that have not claimed it.
- Mystery Chest is now functional (250 gems) with instant random rewards.
- Added clearer purchase/insufficient-gem states in the Shop UI.
- Starter bonus can be claimed directly from the Shop so a new account is not stuck at 0 gems.
- Existing XP/gem earning logic remains unchanged.

## Note
The Firebase security rules already allow the signed-in owner to update the shop fields, so no rule change was required.
