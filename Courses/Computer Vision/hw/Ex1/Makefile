TEST_DIR = ./src/test/googletest-release-1.8.0/googletest

run: compile
	cd ./src && ./cv_hw1.exe

compile:
	g++ -I ./src/lib/X11/include ./src/cv_hw1.cpp  -L./src/lib/X11/lib -lX11 -o ./src/cv_hw1.exe 

test: test_compile
	cd ./src/test && ./test.exe

test_compile:
	g++ -I ./src/lib/X11/include ./src/test/test.cpp  -L./src/lib/X11/lib -lX11 -o ./src/test/test.exe 


clean:
	rm -rf ./src/cv_hw1 cv_hw1