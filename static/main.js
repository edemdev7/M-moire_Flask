$(document).ready(function() {
    $('#compare-form').on('submit', function(event) {
        event.preventDefault();
        var network1 = $('#network1').val();
        var network2 = $('#network2').val();

        $.ajax({
            url: '/compare',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                network1: network1,
                network2: network2
            }),
            success: function(data) {
                

                console.log('Data received:', data); // Ajoutez ceci pour voir les données reçues

                var resultHtml = '<h2>Résultats de la comparaison</h2>';
                resultHtml += '<h3>Réseau 1</h3>';
                resultHtml += '<p>Positif: ' + data.network1.positive + '</p>';
                resultHtml += '<p>Négatif: ' + data.network1.negative + '</p>';
                resultHtml += '<p>Neutre: ' + data.network1.neutral + '</p>';
                resultHtml += '<h3>Réseau 2</h3>';
                resultHtml += '<p>Positif: ' + data.network2.positive + '</p>';
                resultHtml += '<p>Négatif: ' + data.network2.negative + '</p>';
                resultHtml += '<p>Neutre: ' + data.network2.neutral + '</p>';
                $('#result').html(resultHtml);

                
                // Récupérer le contexte du canvas
                var ctx = document.getElementById('chart').getContext('2d');

                // Vérifiez si le contexte est correct
                if (ctx) {
                    console.log('Canvas context obtained');
                } else {
                    console.error('Failed to obtain canvas context');
                }

                // Générer les graphiques
                window.chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Positif', 'Négatif', 'Neutre'],
                        datasets: [
                            {
                                label: 'Réseau 1',
                                data: [data.network1.positive, data.network1.negative, data.network1.neutral],
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Réseau 2',
                                data: [data.network2.positive, data.network2.negative, data.network2.neutral],
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                console.log('Chart created successfully'); // Ajoutez ceci pour confirmer la création du graphique
            },
            error: function(error) {
                alert('Erreur lors de la comparaison des réseaux');
                console.error('Error:', error); // Ajoutez ceci pour voir les erreurs
            }
        });
    });
});
