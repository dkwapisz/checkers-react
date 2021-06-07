# Projekt Warcaby - React

Screeny z gry. :)

# Timer
Po odpaleniu gry, czas leci dla gracza czerwonego. 

![image](https://user-images.githubusercontent.com/56120693/121072406-78942880-c7d1-11eb-8e4f-bc00b9330b63.png)

Gdy wykonamy ruch kolorem czerwonym, timer leci dla gracza czarnego i tak naprzemiennie. Jeżeli zostanie któremuś z nich 0:00, wówczas przegrywa.

# Historia ruchów
Ruchy graczy zapisują się pokolei w historii. Numery odpowiadają ruchom graczy. Jeżeli gracz wykonywał kilkukrotne bicie, to ruch zapisze się do historii dopiero po zakończeniu bicia. 

![image](https://user-images.githubusercontent.com/56120693/121072743-e04a7380-c7d1-11eb-8875-3d26979f0cbc.png)

# Bicie
Gracz ma obowiązek bicia w grze. Jeżeli może, to musi wykonać taki ruch. Jeżeli na swojej drodze, może wykonać kilukrotne bicie, to też musi je wykonać.

![image](https://user-images.githubusercontent.com/56120693/121073120-6cf53180-c7d2-11eb-981b-269442421f20.png)

Ruch nr 13 dla gracza czarnego.

![image](https://user-images.githubusercontent.com/56120693/121073143-74b4d600-c7d2-11eb-8ef2-2330b0ac69f9.png)

Ruch nr 14 - zakończyło się podwójne bicie.

# Królówki

W grze występują królówki - gdy dojdziemy pionkiem na przeciwległy kraniec planszy. Mogą one wykonywać ruch przez całą planszę, lecz tak jak zwykłe pionki, tylko po skosie i jeżeli jest możliwość bicia.

![image](https://user-images.githubusercontent.com/56120693/121073464-d9703080-c7d2-11eb-9995-1596be57d2f4.png)

![image](https://user-images.githubusercontent.com/56120693/121073829-56030f00-c7d3-11eb-99c6-f023dcb04975.png)

Możliwy ruch królówki czarnej.

# Koniec gry

Gra kończy się jeżeli któremuś z graczy zakończył się czas - 10 minut albo jeżeli wszystkie jego pionki zostaną zbite przez przeciwnika. Strona wyrzuca wtedy okienko z powiadomieniem, który z graczy wygrał, a po wciśnięciu "ok", strona odświeża się a gra zaczyna od nowa.

![image](https://user-images.githubusercontent.com/56120693/121074202-d3c71a80-c7d3-11eb-8a43-c8552384de7d.png)

![image](https://user-images.githubusercontent.com/56120693/121074308-f9542400-c7d3-11eb-9296-e3ef60bc70fe.png)
