// Function to fetch JSON data from the provided URL
async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/divyansh8866/datAtlantics/main/blogs.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to truncate a string to a specified length
function truncateString(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

// Function to display blog data for a specific page
function displayPage(pageNumber, pageSize, data) {
    const startIdx = (pageNumber - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = ''; // Clear existing content

    const paginatedData = data.slice(startIdx, endIdx);

    paginatedData.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.className = 'col-md-3 p-3 card box-shadow bg-body rounded m-2';

        blogElement.innerHTML = `
            <img src="${blog.thumbnail}" class="img-fluid rounded-start" alt="No Image found">
            <div>
                <a href="${blog.file_url}" style="color: rgb(0, 153, 255); text-decoration: none;" target="_blank">
                    <h5><strong>${blog.blog_title}</strong></h5>
                </a>
                <p style="font-size: 14px; line-height: 2;">${truncateString(blog.description, 150)}</p>
                <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <a type="button" class="btn btn-sm btn-outline-secondary" href="${blog.file_url}">View</a>
                    <a type="button" class="btn btn-sm btn-outline-secondary" href="">Share</a>
                </div>
                <small class="text-muted">${blog.file_date}</small>
                </div>
            </div>
        `;

        blogList.appendChild(blogElement);
    });
}

// Function to create pagination links
function createPaginationLinks(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination links

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        paginationContainer.insertBefore(pageItem, document.getElementById('nextPage'));
        pageItem.addEventListener('click', () => handlePageClick(i));
    }
}

// Function to handle page click event
function handlePageClick(pageNumber) {
    displayPage(pageNumber, 6, jsonData);
    updateActivePage(pageNumber);
}

// Function to update active page styling
function updateActivePage(pageNumber) {
    const paginationLinks = document.querySelectorAll('.pagination .page-item');
    paginationLinks.forEach(link => link.classList.remove('active'));
    paginationLinks[pageNumber - 1].classList.add('active');
}

// Call the displayData function on page load
async function initialize() {
    jsonData = await fetchData();
    const totalPages = Math.ceil(jsonData.length / 6);
    createPaginationLinks(totalPages);
    displayPage(1, 6, jsonData);
    updateActivePage(1);
}

// Call the initialize function on page load
initialize();