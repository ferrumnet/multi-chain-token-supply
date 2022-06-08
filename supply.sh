echo "FRM Multi-Chain Total Supply"
echo "Ethereum Total Supply"
curl "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C&apikey=XH8PK4M2TB7EKYMNZ4XN5C1N262MYY9E97"
echo "\n"

echo "BSC Total Supply"
curl "https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc&apikey=28I5ITFX1EYAC8XZGHXZTFRZAUP5K7II8P"
echo "\n"

echo "Polygon Total Supply"
curl "https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=0xd99baFe5031cC8B345cb2e8c80135991F12D7130&apikey=YourApiKeyToken"
echo "\n"

echo "Avalanche Total Supply"
curl "https://api.snowtrace.io/api?module=stats&action=tokensupply&contractaddress=0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C&apikey=YourApiKeyToken"
echo "\n"