# FitNotFat - CodersCamp 2020/21 Projekt Typescript 

## I. O Projekcie
Zrealizowany projekt to aplikacja webowa umożliwiająca zapisywanie spożywanych każdego dnia produktów, wykonanych ćwiczeń oraz wagi w celu kontroli kaloryczności diety i masy ciała. Aplikacja dostarcza użytkownikowi informacje ile kalorii dziennie powinien spożywać, aby osiągnąć określony cel: utrzymać obecną wagę, schudnąć lub zwiększyć masę ciała. Projekt jest tworzony w ramach udziału w CodersCamp 2020, wykorzystując takie technologie jak Typescript, HTML i CSS. Działanie projektu zostało pokryte testami jednostkowymi. 

* [DEMO Projektu](https://krystiankjjk.github.io/CodersCamp2020.Project.TypeScript.FitNotFat/)

Zespół, którego mentorem był Krystian wspólnie pracował nad pisaniem kodu, natomiast w ramach dodatkowych odpowiedzialności zajmował się także sprawdzaniem jego poprawności i stylu, a także wewnętrznym zarządzaniem projektem. Spis dodatkowych ról: 
* Konrad (Development Manager)
* Justyna (Product Owner)
* Robert (Code Review)
* Filip(Code Review)
* Ireneusz(Code Review)

## II. Repozytorium 
W skład repozytorium projektu wchodzą:
* `index.html`, `App.ts` - pliki wyjściowe projektu,
* folder `Src` - pliki z funkcjonalnościami na stronie, podzielony na podfoldery:
   *	`Src/Apiconnection` - pliki dotyczące łączenia się z zewnętrznym API,
   *	`Src/Logic` - pliki z kodem logiki aplikacji,
   *	`src/UIComponents` - pliki zawierające komponenty oraz style CSS,
*	folder `Test` - pliki z testami jednostkowymi dla funkcjonalności aplikacji
*	folder `Static` - pliki graficzne wykorzystywane w aplikacji
*	folder `Constants` –pliki zawierające stałe wykorzystywane w projekcie
*	folder `Models` – pliki zawierające interfejsy modeli danych wykorzystywanych w aplikacji
*	folder `UnitImplementations` – pliki przedstawiające wygląd i działanie poszczególnych komponentów (przydatne podczas przeprowadzania code review)

## III. Funkcjonalności aplikacji
### Strona główna 
Na stronie głównej dostępne są dwie opcje: *Sign up* oraz *Log In*. *Sign up* przekierowuje do formularza tworzenia konta użytkownika, natomiast *Log In* przenosi użytkownika bezpośrednio do okna logowania. 

![homePage](/Static/form.png)

### Tworzenie konta użytkownika
Korzystanie z aplikacji jest uwarunkowane stworzeniem konta użytkownika. W tym celu konieczne jest wypełnienie formularza. Użytkownik musi podać następujące informacje: nickname, płeć, data urodzenia, wzrost, obecna waga, docelowa waga, cel tygodniowy oraz poziom aktywności fizycznej. Powyższe dane zostaną zapisane do Local Storage i wykorzystane do ustalenia optymalnej liczby kalorii, które użytkownik powinien spożywać, aby osiągnąć wybrany cel.

### Logowanie
Po utworzeniu konta użytkownika, aby przejść do kolejnych sekcji aplikacji należy zalogować się podając nickname. W przypadku, kiedy użytkownik nie uzupełni pola logowania lub poda nieprawidłowy nickname, na ekranie zostaje wyświetlone okno modalne z odpowiednim błędem. Poprawnie przeprowadzone logowanie skutkuje zapisaniem zalogowanego użytkownika do LocalStorage jako loggedInUser i przeniesieniem do sekcji Overview menu konta użytkownika.  

### Menu konta użytkownika
W menu konta użytkownika dostępne są zakładki przenoszące użytkownika do odpowiednich sekcji: *Overview* , *My diary*, *My goals*, *My weights*, *API Key*, *Log out* oraz opcja *Username*, przenosząca użytkownika do sekcji *My profile* zawierającej podstawowe informacje o zalogowanym użytkowniku. 

### Overview
Sekcja Overview umożliwia użytkownikowi: 
*	codzienną aktualizację wagi – kliknięcie przycisku *EDIT* pozwala wprowadzić wagę, która po naciśnięciu przycisku *SAVE* zostaje zapisana do obiektu użytkownika w Local Storage,   
*	kontrolowanie dziennego spożycia kalorii, dzięki dwóm wskaźnikom reprezentującym: procentową ilość spożytych kalorii oraz pozostałe kalorie. Wskaźniki są wyliczane indywidualnie dla każdego użytkownika na podstawie danych wprowadzonych podczas rejestracji. Aktualizacja wskaźników następuje każdorazowo po dodaniu w dzienniku spożytych produktów i/lub wykonanych danego dnia ćwiczeń, 
*	śledzenie postępu w dążeniu do założonej wagi, dzięki procentowemu wskaźnikowi goal weight.

### My diary
Korzystanie z sekcji My diary jest możliwe po uzupełnieniu Nutritionix API Key – klucz niezbędny do połączenia z API, z którego korzysta aplikacja.

Sekcja My diary dzieli się na dwie części: *Food* oraz *Exercises*. W części *Food* użytkownik ma możliwość wprowadzania wszystkich produktów, które spożył danego dnia w podziale na cztery kategorie: śniadanie, obiad kolację oraz przekąski. Po naciśnięciu przycisku *ADD* pojawia się pole umożliwiające wpisanie nazwy produktu. Kliknięcie przycisku *FIND* powoduje połączenie z API Nutritionix i wyszukanie wybranego artykułu spożywczego. Ponowne naciśnięcie opcji *ADD* skutkuje dodaniem i zapisaniem produktu oraz wyświetleniem zaktualizowanej listy. Pojedynczy wiersz listy zawiera nazwę, ilość, jednostkę oraz kaloryczność prodktu. W części *Exercises* użytkownik może wprowadzać wszystkie aktywności fizyczne, które wykonał danego dnia. Komponent działa analogicznie jak w części *Food*, z tą różnicą, że wyświetlana jest lista ćwiczeń uwzględniająca rodzaj, czas wykonywania ćwiczenia oraz spalone kalorie. 

### My goals
W sekcji My goals użytkownik ma możliwość dodawania celów tygodniowych(schudnąć, przytyć lub utrzymać wagę) oraz sprawdzania jak wygląda historia celów tygodniowych, które cele zostały osiągnięte, które nie zostały osiągnięte, jaka była waga początkowa a jaka była waga końcowa. 

### My weights 
W sekcji My weights użytkownik może sprawdzać jak zmieniała się jego waga w czasie od dnia rozpoczęcia korzystania z aplikacji. 

### API Key 
Możliwość korzystania z Nutritionix API w darmowej wersji jest ograniczona do dwóch aktywnych użytkowników. Z tego względu korzystanie ze wszystkich funkcjonalności aplikacji jest możliwe po wygenerowaniu własnego klucza dostępu do API Nutritionix oraz Application ID. W celu wygenerowania kliknij [TUTAJ](https://www.nutritionix.com/business/api). W sekcji API Key należy wprowadzić swój klucz dostępu do API oraz Application ID. Uzupełnienie powyższych  danych jest konieczne do prawidłowego funkcjonowania sekcji My Diary. 

### Testy jednostkowe
Każda funkcjonalność użyta w projekcie została przetestowana testami jednostkowymi. 

## IV. Wykorzystane technologie
* TypeScript
* HTML
* CSS
* Nutritionix API 

## V. Użyte zagadnienia
W projekcie można znaleźć przykłady zastosowania wszystkich tych zagadnień: basic types, custom types, merged types, classes/interfaces, generic types.

## VI. Uruchomienie projektu i testów
### Uruchomienie projektu
Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:
* Zainstaluj zależności za pomocą komendy: `npm install`
* Wystartuj serwer developerski `npm run start:dev`
* Aplikacja będzie dostępna pod adresem `localhost:8765`

### Uruchomienie testów
Aby uruchomić testy jednostkowe aplikacji, wykonaj następujące kroki:
* Zainstaluj zależności za pomocą komendy: `npm install` (jeśli nie zrobiłeś już tego wcześniej).
* Uruchom testy, wykonując komendę: `npm run test`.


