const { db } = require('./firebase');

async function viewData() {
    console.log('\n--- 📊 Fetching Current Database Data ---\n');

    try {
        // Fetch Expenses
        const expSnapshot = await db.collection('expenses').get();
        console.log(`📌 EXPENSES (${expSnapshot.docs.length} found):`);
        expSnapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`  - [${data.date}] ${data.category}: $${data.amount} (${data.description})`);
        });

        console.log('\n----------------------------------------\n');

        // Fetch Income
        const incSnapshot = await db.collection('income').get();
        console.log(`💰 INCOME (${incSnapshot.docs.length} found):`);
        incSnapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`  - [${data.date}] ${data.source}: $${data.amount}`);
        });

    } catch (error) {
        console.error('❌ Error fetching data:', error.message);
    }

    console.log('\n--- End of Data ---\n');
    process.exit();
}

viewData();
