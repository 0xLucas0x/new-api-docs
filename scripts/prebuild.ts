/**
 * API-only docs build.
 *
 * The upstream docs app generates changelog and contributor pages before build,
 * but this customization trims the public site down to API reference only.
 * Keep prebuild as a lightweight no-op so non-API content does not reappear.
 */

async function prebuild() {
  console.log('═══════════════════════════════════════════════');
  console.log('🚀 Starting prebuild process...');
  console.log('═══════════════════════════════════════════════\n');
  console.log('ℹ API-only mode: skipping non-reference content generation\n');
  console.log('═══════════════════════════════════════════════');
  console.log('✅ Prebuild completed! Duration: 0.00s');
  console.log('═══════════════════════════════════════════════\n');
}

void prebuild();
