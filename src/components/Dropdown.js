import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export function DropdownMenu( {language, onLanguageSelect} ) {
    function lang1() {
        language = "C++";
        onLanguageSelect(language);
    }
    function lang2() {
        language = "Java";
        onLanguageSelect(language);
    }
    function lang3() {
        language = "Python";
        onLanguageSelect(language);
    }
    function lang4() {
        language = "Python3";
        onLanguageSelect(language);
    }
    function lang5() {
        language = "C";
        onLanguageSelect(language);
    }
    function lang6() {
        language = "C#";
        onLanguageSelect(language);
    }
    function lang7() {
        language = "Javascript";
        onLanguageSelect(language);
    }
    function lang8() {
        language = "Ruby";
        onLanguageSelect(language);
    }
    function lang9() {
        language = "Swift";
        onLanguageSelect(language);
    }
    function lang10() {
        language = "Go";
        onLanguageSelect(language);
    }
    function lang11() {
        language = "Scala";
        onLanguageSelect(language);
    }
    function lang12() {
        language = "Kotlin";
        onLanguageSelect(language);
    }
    function lang13() {
        language = "Rust";
        onLanguageSelect(language);
    }
    function lang14() {
        language = "PHP";
        onLanguageSelect(language);
    }
    function lang15() {
        language = "TypeScript";
        onLanguageSelect(language);
    }
    function lang16() {
        language = "Racket";
        onLanguageSelect(language);
    }
    function lang17() {
        language = "Erlang";
        onLanguageSelect(language);
    }
    function lang18() {
        language = "Elixir";
        onLanguageSelect(language);
    }
    function lang19() {
        language = "Dart";
        onLanguageSelect(language);
    }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          Choose Language
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item onClick={ lang1 } href="#/action-1" active>C++</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang2 } href="#/action-4">Java</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang3 } href="#/action-4">Python</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang4 } href="#/action-4">Python3</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang5 } href="#/action-4">C</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang6 } href="#/action-4">C#</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang7 } href="#/action-4">JavaScript</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang8 } href="#/action-4">Ruby</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang9 } href="#/action-4">Swift</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang10 } href="#/action-4">Go</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang11 } href="#/action-4">Scala</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang12 } href="#/action-4">Kotlin</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang13 } href="#/action-4">Rust</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang14 } href="#/action-4">PHP</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang15 } href="#/action-4">TypeScript</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang16 } href="#/action-4">Racket</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang17 } href="#/action-4">Erlang</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang18 } href="#/action-4">Elixir</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={ lang19 } href="#/action-4">Dart</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
