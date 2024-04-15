export async function uploadImage(file) {
    const data = new FormData();    // 첨부파일 넣을 때 무조건 있어야함
    data.append('file', file)
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: data,
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data.url;
    });
}