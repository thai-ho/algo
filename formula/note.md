<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inclusion-Exclusion Principle</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .step {
            margin: 20px 0;
            padding: 20px;
            border-left: 4px solid #007acc;
            background: #f8f9ff;
        }
        .example {
            background: #ffe6e6;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .formula {
            background: #e6f3ff;
            padding: 15px;
            border-radius: 8px;
            font-size: 18px;
            text-align: center;
            margin: 20px 0;
        }
        .visual {
            display: flex;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        .circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
        }
        .a { background: rgba(255, 0, 0, 0.7); }
        .b { background: rgba(0, 255, 0, 0.7); }
        .c { background: rgba(0, 0, 255, 0.7); }
        .ab { background: rgba(255, 255, 0, 0.7); color: black; }
        .ac { background: rgba(255, 0, 255, 0.7); }
        .bc { background: rgba(0, 255, 255, 0.7); color: black; }
        .abc { background: rgba(128, 128, 128, 0.7); }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: center;
        }
        th {
            background: #f0f0f0;
        }
        .highlight {
            background: #ffeb3b;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Nguyên lý Inclusion-Exclusion (Bao hàm - Loại trừ)</h1>
        
        <div class="formula">
            |A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|
        </div>

        <h2>🎯 Vấn đề cốt lõi: Tránh đếm trùng lặp</h2>

        <div class="step">
            <h3>Bước 1: Cộng tất cả |A| + |B| + |C|</h3>
            <p><strong>Vấn đề:</strong> Chúng ta sẽ đếm trùng các phần tử thuộc nhiều tập hợp!</p>

            <div class="visual">
                <div class="circle a">A only<br/>đếm 1 lần ✓</div>
                <div class="circle ab">A ∩ B<br/>đếm 2 lần ❌</div>
                <div class="circle abc">A ∩ B ∩ C<br/>đếm 3 lần ❌</div>
            </div>
        </div>

        <div class="step">
            <h3>Bước 2: Trừ đi các giao |A ∩ B| - |A ∩ C| - |B ∩ C|</h3>
            <p><strong>Mục đích:</strong> Sửa lỗi đếm trùng ở bước 1</p>

            <div class="visual">
                <div class="circle ab">A ∩ B<br/>2-1=1 lần ✓</div>
                <div class="circle abc">A ∩ B ∩ C<br/>3-3=0 lần ❌</div>
            </div>
            <p><strong>Vấn đề mới:</strong> Phần A ∩ B ∩ C bị trừ quá nhiều (từ 3 xuống 0)!</p>
        </div>

        <div class="step">
            <h3>Bước 3: Cộng lại |A ∩ B ∩ C|</h3>
            <p><strong>Mục đích:</strong> Sửa lỗi bị trừ quá nhiều ở bước 2</p>

            <div class="visual">
                <div class="circle abc">A ∩ B ∩ C<br/>0+1=1 lần ✓</div>
            </div>
            <p><strong>Kết quả:</strong> Mọi phần tử đều được đếm đúng 1 lần!</p>
        </div>

        <h2>📊 Ví dụ cụ thể với bài toán kẹo</h2>

        <div class="example">
            <h3>Cho n=8, limit=2</h3>
            <p><strong>A:</strong> Trường hợp đứa 1 nhận > 2 viên (≥ 3 viên)</p>
            <p><strong>B:</strong> Trường hợp đứa 2 nhận > 2 viên (≥ 3 viên)</p>
            <p><strong>C:</strong> Trường hợp đứa 3 nhận > 2 viên (≥ 3 viên)</p>
        </div>

        <table>
            <tr>
                <th>Bước</th>
                <th>Công thức</th>
                <th>Ý nghĩa</th>
                <th>Trạng thái đếm</th>
            </tr>
            <tr>
                <td>1. Cộng đơn</td>
                <td>|A| + |B| + |C|</td>
                <td>Đếm tất cả trường hợp vi phạm</td>
                <td class="highlight">Đếm trùng nhiều!</td>
            </tr>
            <tr>
                <td>2. Trừ đôi</td>
                <td>- |A ∩ B| - |A ∩ C| - |B ∩ C|</td>
                <td>Bỏ đi phần đếm trùng đôi</td>
                <td class="highlight">Trừ quá phần ba!</td>
            </tr>
            <tr>
                <td>3. Cộng ba</td>
                <td>+ |A ∩ B ∩ C|</td>
                <td>Sửa lại phần bị trừ quá</td>
                <td class="highlight">Hoàn hảo! ✓</td>
            </tr>
        </table>

        <h2>🔢 Tính toán chi tiết</h2>

        <div class="step">
            <h3>Ví dụ: n=8, limit=2</h3>
            <p><strong>Tổng cách phân phối:</strong> C(8+2, 2) = C(10, 2) = 45</p>

            <ul>
                <li><strong>|A|:</strong> Đứa 1 ≥ 3 viên → C(8-3+2, 2) = C(7, 2) = 21</li>
                <li><strong>|B|:</strong> Đứa 2 ≥ 3 viên → C(7, 2) = 21</li>
                <li><strong>|C|:</strong> Đứa 3 ≥ 3 viên → C(7, 2) = 21</li>
                <li><strong>|A ∩ B|:</strong> Đứa 1,2 đều ≥ 3 viên → C(8-6+2, 2) = C(4, 2) = 6</li>
                <li><strong>|A ∩ C|:</strong> Đứa 1,3 đều ≥ 3 viên → C(4, 2) = 6</li>
                <li><strong>|B ∩ C|:</strong> Đứa 2,3 đều ≥ 3 viên → C(4, 2) = 6</li>
                <li><strong>|A ∩ B ∩ C|:</strong> Cả 3 đều ≥ 3 viên → C(8-9+2, 2) = C(1, 2) = 0</li>
            </ul>

            <p><strong>Kết quả:</strong> 45 - (21+21+21) + (6+6+6) - 0 = 45 - 63 + 18 = 0</p>
            <p><em>Có nghĩa là không có cách nào phân phối 8 viên kẹo mà mỗi đứa ≤ 2 viên!</em></p>
        </div>

        <h2>💡 Tại sao không thể dùng cách đơn giản "tổng - từng case"?</h2>

        <div class="example">
            <p><strong>Vấn đề:</strong> Các case không độc lập!</p>
            <p>• Case "đứa 1 vi phạm" có thể chồng chéo với "đứa 2 vi phạm"</p>
            <p>• Nếu chỉ trừ đơn giản, ta sẽ trừ thiếu hoặc trừ thừa</p>
            <p><strong>Inclusion-exclusion đảm bảo:</strong> Mỗi trường hợp được đếm đúng 1 lần, không hơn không kém!</p>
        </div>
    </div>

</body>
</html>
