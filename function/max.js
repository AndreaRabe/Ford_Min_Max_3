// function fordMax(){
//
// }
//
// // // max from claude
// // const nodes = [
// //     { id: '458ee6a9-010e-40fd-a367-c1511b52c202', x: -209, y: -102, label: 'x1' },
// //     { id: 'df651ca3-b0d8-4baf-8164-0f1281c986c2', x: 7, y: -100, label: 'x2' },
// //     { id: 'ab4be705-0a50-46f9-b53a-5f27fbe74967', x: -31, y: 28, label: 'x3' },
// //     { id: '20ecb12f-4ce0-46c6-bbea-21fd39d27e2b', x: -165, y: 38, label: 'x4' }
// // ];
// //
// // const edges = [
// //     { from: '458ee6a9-010e-40fd-a367-c1511b52c202', to: 'df651ca3-b0d8-4baf-8164-0f1281c986c2', label: '4', id: '16a47a66-7084-42fa-82cc-cbb72e225c73' },
// //     { from: '458ee6a9-010e-40fd-a367-c1511b52c202', to: '20ecb12f-4ce0-46c6-bbea-21fd39d27e2b', label: '4', id: '602e35b6-ae6d-4335-9b0d-9fd61e2e381a' },
// //     { from: '20ecb12f-4ce0-46c6-bbea-21fd39d27e2b', to: 'ab4be705-0a50-46f9-b53a-5f27fbe74967', label: '2', id: '7c23fbf3-24cd-4fc2-8c43-90e7f05afd68' },
// //     { from: 'df651ca3-b0d8-4baf-8164-0f1281c986c2', to: 'ab4be705-0a50-46f9-b53a-5f27fbe74967', label: '2', id: '70066c7f-7e5d-453f-9bd0-50549e73ca9a' },
// //     { from: '458ee6a9-010e-40fd-a367-c1511b52c202', to: 'ab4be705-0a50-46f9-b53a-5f27fbe74967', label: '2', id: 'd9939ea0-a146-4f68-86af-90b9754d9a30' }
// // ];
//

function handleMaxClick(nodes, edges){
    removeAllColorsFromNodes();
    removeAllColorsFromEdges();
    function maximisationAlgo(nodes, edges, sourceNodeId, destinationNodeId) {
    const n = nodes.length;
    const dist = {};
    const prev = {};
    const paths = {};

    // Initialiser les distances à 0 pour tous les nœuds
    for (const node of nodes) {
        dist[node.id] = 0;
        prev[node.id] = null;
        paths[node.id] = [];
    }

    // Définir la distance du nœud source à 0
    paths[sourceNodeId] = [[sourceNodeId]];

    // Boucle de relaxation
    for (let i = 0; i < n - 1; i++) {
        for (const edge of edges) {
            const u = edge.from;
            const v = edge.to;
            const weight = parseInt(edge.label);

            if (dist[v] < dist[u] + weight) {
                dist[v] = dist[u] + weight;
                prev[v] = u;
                paths[v] = paths[u].map(path => [...path, v]);
            } else if (dist[v] === dist[u] + weight) {
                const newPaths = paths[u].map(path => [...path, v]);
                paths[v].push(...newPaths);
            }
        }
    }


    // Vérifier s'il y a un cycle de poids positif (dans ce cas, la distance peut être infinie)
    for (const edge of edges) {
        const u = edge.from;
        const v = edge.to;
        const weight = parseInt(edge.label);

        if (dist[v] < dist[u] + weight) {
            console.log("Le graphe contient un cycle de poids positif");
            // Sélectionner le bouton
            const errorButton = document.getElementById('errorButton');

            // Simuler un clic sur le bouton
                        errorButton.click();
            return null;
        }
    }

    // Supprimer les doublons dans les chemins maximaux
    const destinationPaths = Array.from(new Set(paths[destinationNodeId].map(JSON.stringify))).map(JSON.parse);

    return { distance: dist[destinationNodeId], chemins: destinationPaths };
}

    const sourceNodeId = nodes[0].id;
    const destinationNodeId = nodes[nodes.length - 1].id;
    let idsCheminMax;

    const result = maximisationAlgo(nodes, edges, sourceNodeId, destinationNodeId);

    if (result) {
        console.log(`Distance maximale de ${sourceNodeId} à ${destinationNodeId} : ${result.distance}`);
        const inputElement = document.getElementById('resultat');
        inputElement.value = result.distance;
        console.log(`Chemins maximaux uniques :`);
        result.chemins.forEach(chemin => {

            idsCheminMax = chemin
            setColorOfNodeById(idsCheminMax, 'red');

            console.log(`${chemin.join(' -> ')}`);
        });
    } else {
        console.log("Impossible de trouver un chemin maximal car le graphe contient un cycle de poids positif.");
    }
}
