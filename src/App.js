/*global chrome*/
import React, { useEffect, useState } from "react";
import { DropdownMenu } from './components/Dropdown';
import prettier from 'prettier';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { apiKey } from './utils/constants'; // stores environment variables

import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import { CircularProgress } from '@mui/material';

import { Configuration, OpenAIApi } from "openai";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [solution, setSolution] = useState("");
  const [language, setlanguage] = useState("C++"); // default language is C++
  const [leetcodeQuestion, setLeetcodeQuestion] = useState(""); // default language is C++

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  function fetchPrompt() {
        // The below Code gathers the LeetCode problem prompt which will be sent to the API
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          // Get the active tab
          let tab = tabs[0];
    
          // Inject the content script
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
              // Find the element with the class you want to extract text from
              let element = document.querySelector('._1l1MA');
    
              // Extract the text from the element
              let text = element.innerText;
    
              // Send the text back to the extension
              chrome.runtime.sendMessage({text: text});
              
              //console.log(text);
            }
          });
        });
    
        // Listen for the onMessage event
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
          // Check if the message contains an error
          if (message.error) {
            console.error(message.error);
            return;
          }
    
          // Access the text from the message
          let text = message.text;
          setLeetcodeQuestion(text); // store the text in global variable
          console.log(leetcodeQuestion);
    
          // Do something with the text
          //console.log(text); // This will show what the javascript captures as the "prompt for the Leetcode Problem"
    
          // Send a response back to the content script
          sendResponse({received: true});
        });
  }

  useEffect(() => { // Run once when page loads
    fetchPrompt();
  }, []);

  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    try {
      chrome.storage.local.get(null, function (data) {
        if ("prompt" in data) {
          setPrompt(data.prompt);
        }
      });
    } catch (e) {
      console.log("Error due to local state");
    }
  }, []);

  async function handleSubmit() {
    console.log(language);
    setIsLoading(true);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500, // Maximum characters in ChatGPT response
      });
      setResponse(completion.data.choices[0].text);
      setIsLoading(false);
    } catch (e) {
      alert("Error: ", e);
      setIsLoading(false);
    }
  }

  async function handleLanguageSelect(language) {
    setSolution("");
    setIsLoading(true);
    console.log(`Selected language: ${language}`);
    // Add your event handling code here
    fetchPrompt(); // Get current prompt on screen

    // Now call the OpenAI API
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Solve the following Leetcode problem: "${leetcodeQuestion}" using only ${language}. Do not say anything except the answer expressed as code.`,
        max_tokens: 500, // Maximum characters in ChatGPT response
      });
      setSolution(completion.data.choices[0].text);
      setIsLoading(false);
    } catch (e) {
      alert("Error: ", e);
      setIsLoading(false);
    }
  }

  let loadComponent;
  if (isLoading) { // 'State' of being logged in
    loadComponent = (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress sx={{'& .MuiLinearProgress-bar': {backgroundColor: 'orange'}}}/>
      </Stack>
    )
  } else {
    loadComponent = (
      <></>
    )
  }

  return (
    <Container>
      <h1 id="leet">Leet<span id="gpt">GPT</span></h1>
      <h2>Solve my problem using: &nbsp;&nbsp;<DropdownMenu language={language} onLanguageSelect={handleLanguageSelect}/></h2>
      <div class="responseBox">
        { loadComponent }
        <pre id="insertGPT">{ solution }</pre>
      </div>
      <Box sx={{ width: "100%", mt: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              label="Ask ChatGPT something else"
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                chrome.storage.local.set({ prompt: e.target.value });
              }}
              InputLabelProps={{
                style: { color: 'grey' },
              }}
              InputProps={{
                style: { color: 'white' },
              }}
            />
            <Button
              style={{backgroundColor:"rgb(255, 123, 0)", margin: "0%"}}
              fullWidth
              disableElevation
              variant="contained"
              onClick={() => handleSubmit()}
              disabled={isLoading}
              startIcon={
                isLoading && (
                  <AutorenewIcon
                    sx={{
                      animation: "spin 2s linear infinite",
                      "@keyframes spin": {
                        "0%": {
                          transform: "rotate(360deg)",
                        },
                        "100%": {
                          transform: "rotate(0deg)",
                        },
                      },
                    }}
                  />
                )
              }
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Paper
            style={{backgroundColor:"rgb(33, 32, 34)", color:"white", margin: "0%"}}
            sx={{ p: 3 }}>{response}</Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
