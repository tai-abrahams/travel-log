const API_URL= process.env.REACT_APP_API_URL;

export async function listLogEntries() {
    const response = await fetch(`http://localhost:1337/api/logs`);
    return response.json();
}

export async function createEntry(logEntry){
    const response = await fetch('http://localhost:1337/api/logs',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(logEntry),
    })

    return response.json();
}
