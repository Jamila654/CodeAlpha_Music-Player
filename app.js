document.addEventListener('DOMContentLoaded', function() {
    const songs = [
        { title: "Until I Found You", artist: "Stephen Sanchez", filePath: "/songs/song1.mp3" },
        { title: "Love Me Like You Do", artist: "Ellie Goulding", filePath: "songs/song2.mp3" },
        { title: "Perfect", artist: "Ed Sheeran", filePath: "songs/song3.mp3" },
        { title: "Expresso", artist: "Sabrina Carpenter", filePath: "songs/song4.mp3" },
    ];

    const playlists = {};
    const categoryGrid = document.querySelector('.category-grid');
    const playlistList = document.getElementById('playlist-list');
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    let currentSongIndex = 0;
    const audioElement = new Audio(songs[currentSongIndex].filePath);

    function playSong(index) {
        currentSongIndex = index;
        const selectedSong = songs[currentSongIndex];
        document.querySelector('.current-song p:nth-child(1)').textContent = selectedSong.title;
        document.querySelector('.current-song p:nth-child(2)').textContent = selectedSong.artist;
        audioElement.src = selectedSong.filePath;
        audioElement.play();
        document.getElementById('play-pause').innerHTML = '<img src="/pause.svg" alt="Pause">';
    }

    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'category-item';
        songItem.innerHTML = `<p>${song.title} - ${song.artist}</p>`;
        songItem.addEventListener('click', () => playSong(index));
        categoryGrid.appendChild(songItem);
    });

    document.getElementById('play-pause').addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            this.innerHTML = '<img src="/pause.svg" alt="Pause">';
        } else {
            audioElement.pause();
            this.innerHTML = '<img src="/play.svg" alt="Play">';
        }
    });

    document.getElementById('next').addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    document.getElementById('prev').addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    document.getElementById('volume-slider').addEventListener('input', function() {
        audioElement.volume = this.value / 100;
    });

    document.getElementById('mute').addEventListener('click', function() {
        audioElement.muted = !audioElement.muted;
        this.innerHTML = audioElement.muted ? '<img src="/mute.svg" alt="Mute">' : '<img src="/volume.svg" alt="Volume">';
    });

    document.getElementById('seek-bar').addEventListener('input', function() {
        const seekTo = audioElement.duration * (this.value / 100);
        audioElement.currentTime = seekTo;
    });

    audioElement.addEventListener('timeupdate', function() {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        document.getElementById('seek-bar').value = progress;
    });

    createPlaylistBtn.addEventListener('click', function() {
        const playlistName = prompt("Enter playlist name:");
        if (playlistName) {
            playlists[playlistName] = [];
            const playlistItem = document.createElement('li');
            playlistItem.innerHTML = `<a href="#">${playlistName}</a>`;
            playlistItem.addEventListener('click', function() {
                const songChoice = prompt(`Add a song to ${playlistName} by entering its number (1-${songs.length}):\n${songs.map((song, index) => `${index + 1}. ${song.title} - ${song.artist}`).join('\n')}`);
                const songIndex = parseInt(songChoice) - 1;
                if (!isNaN(songIndex) && songIndex >= 0 && songIndex < songs.length) {
                    playlists[playlistName].push(songs[songIndex]);
                    alert(`Added "${songs[songIndex].title}" to ${playlistName}`);
                } else {
                    alert("Invalid choice.");
                }
            });
            playlistList.appendChild(playlistItem);
        }
    });

    searchIcon.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        const results = songs.filter(song => song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query));
        categoryGrid.innerHTML = '';
        results.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'category-item';
            songItem.innerHTML = `<p>${song.title} - ${song.artist}</p>`;
            songItem.addEventListener('click', () => playSong(index));
            categoryGrid.appendChild(songItem);
        });
    });
});



