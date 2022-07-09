    <?php
    /**
     * openweathermapから気圧を取得するプログラム
     */
    require('appInfo.php');

    $options = [
        'http' => [
            'method'  => 'GET',
            'timeout' => 3, // タイムアウト時間
        ]
    ];
    $json = @file_get_contents('https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&appid=' . $API_KEY, false, stream_context_create($options));
    $data = json_decode($json, true);

    if ($json === false) {
        return [];
        exit;
    } else {
        $date = date('Y-m-d', $data['daily'][0]['dt']);
        $pressure = $data['daily'][0]['pressure'];
        $newObj = '{"date":"' . $date . '","pressure":' . $pressure . "}\n";
        $lines = file('./formattedData.json');
        function isFetched($lines, $date)
        {
            foreach ($lines as $key => $line) {
                if (strpos($line, $date) != false) {
                    return true;
                }
                if ($key == count($lines) - 1 && strpos($line, $date) == false) {
                    return false;
                }
            }
        }
        if (isFetched($lines, $date) === false) {
            $updatedData = [];
            foreach ($lines as $key => $line) {
                if ($key === count($lines) - 2) {
                    array_push($updatedData, trim($line).",\n");
                    // array_push($updatedData, ",");
                }
                else if ($key === count($lines) - 1) {
                    array_push($updatedData, $newObj);
                    array_push($updatedData, $line);
                } else {
                    array_push($updatedData, $line);
                }
            };
            file_put_contents('formattedData.json', implode('', $updatedData));
        }
    }
