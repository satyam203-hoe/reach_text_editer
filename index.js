document.getElementById('generateButton').addEventListener('click', function() {
    const title = document.getElementById('titleInput').innerHTML;
    const titleLink = document.getElementById('titleLink').value;
    const header = document.getElementById('headerInput').innerHTML;
    const description = document.getElementById('descriptionInput').innerHTML;

    const color1 = document.getElementById('colorPicker1').value;
    const color2 = document.getElementById('colorPicker2').value;

    const headerImageInput = document.getElementById('imageUploadHeader');
    const headerImageLink = document.getElementById('headerImageLink').value;
    const headerImageLinkTitle = document.getElementById('headerImageLinkTitle').value || 'See more about the picture';

    const image1Input = document.getElementById('imageUpload1');
    const image2Input = document.getElementById('imageUpload2');

    const loadImageAsBase64 = (input) => {
        return new Promise((resolve, reject) => {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(input.files[0]);
            } else {
                resolve('');
            }
        });
    };

    Promise.all([
        loadImageAsBase64(headerImageInput),
        loadImageAsBase64(image1Input),
        loadImageAsBase64(image2Input)
    ]).then(([headerImageUrl, imageUrl1, imageUrl2]) => {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        h1, h2 {
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            background: linear-gradient(to right, ${color1}, ${color2});
            -webkit-background-clip: text;
            color: transparent;
        }
        h2 {
            font-size: 2rem;
            color: #333;
            margin-top: 20px;
            background: linear-gradient(to right, ${color1}, ${color2});
            -webkit-background-clip: text;
            color: transparent;
        }
        p {
            font-size: 1rem;
            color: #666;
            margin: 20px 0;
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 20px 0;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            h1 {
                font-size: 2.5rem;
            }
            h2 {
                font-size: 1.5rem;
            }
            p {
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            ${titleLink ? `<a href="${titleLink}" target="_blank"><h1>${title}</h1></a>` : `<h1>${title}</h1>`}
        </header>
        <main>
            <h2>${header}</h2>
            ${headerImageUrl ? `<a href="${headerImageLink}" target="_blank"><img src="${headerImageUrl}" alt="Header Image"></a>` : ''}
            ${headerImageLink ? `<p><a href="${headerImageLink}" target="_blank">${headerImageLinkTitle}</a></p>` : ''}
            <p>${description}</p>
            ${imageUrl1 ? `<img src="${imageUrl1}" alt="Image 1">` : ''}
            ${imageUrl2 ? `<img src="${imageUrl2}" alt="Image 2">` : ''}
        </main>
    </div>
</body>
</html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'blog_post.html';
        link.click();
    }).catch(error => {
        console.error('Error loading images:', error);
    });
});
