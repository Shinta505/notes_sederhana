document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get("id");

    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("Anda harus login terlebih dahulu!");
        window.location.href = "index.html";
        return; // agar sisa script tidak jalan
    }

    if (!noteId) {
        alert("ID catatan tidak ditemukan!");
        return;
    }

    // Ambil elemen-elemen form
    const editNoteForm = document.getElementById("editNoteForm");
    const inputNoteId = document.getElementById("noteId");
    const inputIsi = document.getElementById("isi");
    const inputLabel = document.getElementById("label");

    // Masukkan ID ke dalam input tersembunyi
    inputNoteId.value = noteId;

    // Ambil data catatan dari backend
    fetch(`http://localhost:5000/note/${noteId}`)
        .then(response => response.json())
        .then(note => {
            inputIsi.value = note.isi;
            inputLabel.value = note.label;
        })
        .catch(error => {
            console.error("Gagal mengambil data catatan:", error);
            alert("Terjadi kesalahan saat mengambil data catatan.");
        });

    // Tangani submit form
    editNoteForm.addEventListener("submit", function (event) {
        event.preventDefault();

        fetch(`http://localhost:5000/note/${noteId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                isi: inputIsi.value,
                label: inputLabel.value
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Gagal memperbarui catatan.");
                }
                alert("Catatan berhasil diperbarui!");
                window.location.href = "dashboard.html";
            })
            .catch(error => {
                console.error("Gagal memperbarui catatan:", error);
                alert("Terjadi kesalahan saat memperbarui catatan.");
            });
    });
});
