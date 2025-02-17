const api_url = "https://api.github.com/users/";
async function fetchGitHubUser(username) 
{
    showLoading(true);
    try 
    {
        const response = await fetch(api_url + username);
        if (response.status === 404) 
        {
            throw new Error("User not found. Please check the username.");
        } 
        else if (response.status === 403) 
        {
            throw new Error("API rate limit exceeded. Try again later.");
        } 
        else if (!response.ok) 
        {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const userData = await response.json();
        displayUserData(userData);
    } 
    catch (error) 
    {
        displayError(error.message);
    }
    finally
    {
        showLoading(false);
    }
}

function showLoading(loadingstatus) 
{
    let loader = document.getElementById("loading-indicator");
    if (loadingstatus) 
    {
        loader.style.display = "block";
    }
    else 
    {
        loader.style.display = "none";
    }
}

function displayUserData(user) 
{
    const userInfoElement = document.getElementById("user-info");
    userInfoElement.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        <h2>${user.name || user.login}</h2>
        <p>${user.bio || "No bio available"}</p>
        <ul>
        <li>Public Repos: ${user.public_repos}</li>
        <li>Followers: ${user.followers}</li>
        <li>Following: ${user.following}</li>
        </ul>
        <a href="${user.html_url}" target="_blank">View Profile</a>`;
}

function displayError(message) 
{
    const userInfoElement = document.getElementById("user-info");
    userInfoElement.innerHTML = `<p class="error">${message}</p>`;
}

document.getElementById("form").addEventListener("submit", function (event) 
{
    event.preventDefault();
    const username = document.getElementById("input").value;
    fetchGitHubUser(username);
});
