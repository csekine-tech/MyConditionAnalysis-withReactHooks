
<?php
/**
 * まとめて取得した気圧データをフォーマットするプログラム
 */
$lines = file('./data.csv');
$formattedData = "export const data=[\n";
foreach ($lines as $line) {
    $data = explode(',', $line);
    $dateArr = explode('/', $data[0]);
    if ($dateArr[1] < 10 && $dateArr[1] >= 1) {
        $dateArr[1] = "0" . $dateArr[1];
    }
    if ($dateArr[2] < 10 && $dateArr[2] >= 1) {
        $dateArr[2] = "0" . $dateArr[2];
    }
    $data[0] = $dateArr[0] . "-" . $dateArr[1] . "-" . $dateArr[2];
    $formattedData .= '{"date":"' . $data[0] .'" ,"pressure":' . $data[1] . '},\n';
}
$formattedData .= "];\nexport default data;";
file_put_contents('formattedData_beforeMerge.js', $formattedData);
