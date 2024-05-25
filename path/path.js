let container = document.getElementById('mynetwork');
let data = {
    nodes: new vis.DataSet([]),
    edges: new vis.DataSet([])
};
let nodeNumber = 1
let pEdges;
let pNodes;


let options = {
    layout: {
        hierarchical: false
    },
    edges: {
        arrows: 'to',
        color: 'gray',
        fontColor: 'black',
        smooth: {
            enabled: false // Désactive les courbes pour les arêtes
        }
    },
    manipulation: {
        enabled: true,
        initiallyActive: true,
        addEdge: function(edgeData,callback){
            edgeData.label = prompt("Veuillez enter la valeur de la ligne svp.");
            callback(edgeData);
            pEdges = getEdgesList();
            console.log(pEdges);
        },
        addNode:
            function(nodeData,callback) {
            nodeData.label = 'x' + nodeNumber;
            callback(nodeData);
            pNodes = getNodesList();
            console.log(pNodes);
            nodeNumber = pNodes.length + 1
            },
        edit: true,
        delete: true,
    },
    physics: {
        enabled: false,
    },
    locale: 'fr',
};

let network = new vis.Network(container, data, options);

function getNodesList() {
    return data.nodes.get();
}

function getEdgesList(){
    return data.edges.get();
}

function setColorOfNodeById(nodeListId, color) {
    let nodesList = data.nodes.get();
    let edgesList = data.edges.get();
    for (let i = 0; i < nodeListId.length; i++){
        let targetNode = nodesList.find(node => node.id === nodeListId[i]);
        if (targetNode) {
            targetNode.color = color;
            data.nodes.update(nodesList);
        } else {
            console.log(`Nœud avec l'ID ${nodeListId[i]} non trouvé.`);
        }
        if (i < nodeListId.length - 1) { // Vérifier que i + 1 est dans la plage des indices valides
            let targetEdge = edgesList.find(edge => edge.from === nodeListId[i] && edge.to === nodeListId[i + 1]);
            if (targetEdge) {
                targetEdge.color = color;
                data.edges.update(edgesList);
            } else {
                console.log(`Ligne avec les nœuds ${nodeListId[i]} et ${nodeListId[i + 1]} non trouvée.`);
            }
        }
    }
}


function removeAllColorsFromNodes() {
    // Obtenir tous les nœuds
    let nodesList = data.nodes.get();

    // Parcourir chaque nœud et réinitialiser sa couleur
    nodesList.forEach(node => {
        // Réinitialiser la couleur du nœud à une valeur par défaut
        node.color = null; // Supprime complètement la couleur
    });

    // Mettre à jour le DataSet des nœuds avec les nouvelles données
    data.nodes.update(nodesList);
}

function removeAllColorsFromEdges() {
    // Obtenir tous les nœuds
    let edgesList = data.edges.get();

    // Parcourir chaque nœud et réinitialiser sa couleur
    edgesList.forEach(edge => {
        // Réinitialiser la couleur du nœud à une valeur par défaut
        edge.color = null; // Supprime complètement la couleur
    });

    // Mettre à jour le DataSet des nœuds avec les nouvelles données
    data.edges.update(edgesList);
}

function handleClickClearAll() {
    location.reload();
}
network.on('dragEnd', function() {
    const nodePositions = network.getPositions();
    const updatedNodes = data.nodes.map((node, index) => {
        const position = nodePositions[node.id];
        return { ...node, x: position.x, y: position.y };
    });
    data.nodes.update(updatedNodes);
    console.log("Nouvelles coordonnées des nœuds déplacés :", updatedNodes);
});